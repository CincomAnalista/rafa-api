import { odoo } from '../config/odoo.js';
import { NumbersModel, ClientModel } from '../clients/model.js';

export const ClientsFromOdoo = async () => {
  try {
    // Connect to Odoo
    await odoo.connection();

    // Get data from Odoo
    const moves = await fetchMoves();
    const moveLines = await fetchMoveLines(moves);
    const products = await fetchProducts(moveLines);

    // Merge data
    const response = mergeData(moves, moveLines, products);
    const rest = mergeClients(response);
    const result = await mergeClientsAndNumbers(rest);

    // Save data in MongoDB
    await ClientModel.deleteMany({});
    await ClientModel.insertMany(result);

    // Return data
    return result;
  } catch (error) {
    console.error(error);
    return error;
  } finally {
    odoo.Disconnect();
  }
};

async function fetchMoves() {
  return await odoo.accountModel.moves({
    order: 'asc',
    state: 'posted', // publicado
    _payment_state: 'reversed', // no revertido

    startDate: '2024-11-01', // fecha de inicio
    endDate: '2024-12-31', // fecha de fin

    team: 'bog', // equipo
    personalized: [
      'invoice_user_id',
      'not ilike',
      'Luis Ricardo Millan Castro'
    ], // excluir a Luis Ricardo Millan Castro

    fields: [
      'name',
      'date',
      'line_ids',
      'invoice_user_id',
      'invoice_partner_display_name'
    ] // campos a traer
  });
}

async function fetchMoveLines(moves) {
  const moveLineIds = moves.flatMap((move) => move.line_ids);
  return await odoo.accountModel.moveLines({
    ids: moveLineIds,
    price_subtotal: 0,
    fields: ['product_id', 'price_total']
  });
}

async function fetchProducts(moveLines) {
  const productIds = moveLines
    .map((line) => line.product_id[0])
    .filter((id) => id);

  return await odoo.productModel.product({
    ids: productIds,
    fields: ['name', 'product_variant_id', 'brand_id']
  });
}

function mergeData(moves, moveLines, products) {
  const merge = moveLines.map((line) => {
    const move = moves.find((move) => move.line_ids.includes(line.id));
    const product = products.find((p) => p.id === line.product_id[0]);

    return {
      Vendedor: move.invoice_user_id[1],
      Cliente: move.invoice_partner_display_name,
      brand: product ? product.brand_id[1] : 'No brand',
      Subtotal: line.price_total
    };
  });

  return merge.filter((m) => m.brand === '3M');
}

async function mergeClientsAndNumbers(data) {
  try {
    const numbers = await NumbersModel.find();

    const result = data.map((client) => {
      const numeros = numbers
        .filter((n) => n.Cliente === client.Cliente)
        .flatMap((n) => n.Numeros); // Usar flatMap para aplanar la estructura

      return { ...client, Numeros: numeros };
    });

    return result;
  } catch (error) {
    console.error(error);
    return error;
  }
}

function mergeClients(data) {
  // Agrupar subtotales por Cliente
  const clientSubtotals = data.reduce((acc, item) => {
    if (!acc[item.Cliente]) {
      acc[item.Cliente] = { Subtotal: 0, Vendedor: item.Vendedor };
    }
    acc[item.Cliente].Subtotal += item.Subtotal;
    return acc;
  }, {});

  // Calcular boletas, monto restante y estructurar el resultado
  const result = Object.entries(clientSubtotals).map(([Cliente, values]) => {
    const { Subtotal, Vendedor } = values;
    const Boletas = Math.floor(Subtotal / 4000000);
    const Falta_para_boleta = 4000000 - (Subtotal % 4000000);
    const lastUpdate = new Date().toLocaleString('es-CO', {
      timeZone: 'America/Bogota'
    });

    return {
      Vendedor,
      Cliente,
      Boletas,
      Subtotal,
      Falta_para_boleta,
      lastUpdate
    };
  });
  return result;
}

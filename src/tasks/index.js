import cron from 'node-cron'

export const scheduleTasks = () => {
    const infoColor = '\x1b[36m%s\x1b[0m'; // Color cian
    cron.schedule('0 16 * * 1-5', async () => {
        console.log(infoColor, 'Running a task pyg every day at 4:00 pm')
        // await pygService.update()
    })

}
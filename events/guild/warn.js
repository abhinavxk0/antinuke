module.exports = (Discord, client, e) => {
    const errorLogs = client.channels.cache.get('875700619506241546')
    errorLogs.send(e)
}
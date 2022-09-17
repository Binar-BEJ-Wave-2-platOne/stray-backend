const { app, port } = require('./index')

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const db = require('./db')
const { Color } = require('./models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
  try {
    const color = await new Color({
      code: '#FFFFF',
      alias: 'white'
    })
    await color.save()
    console.log('Created color!')
  } catch (error) {
    throw error
  }
}

const run = async () => {
  await main()
  db.close()
}

run()

const db = require('./db')
const { Color } = require('./models')
const { ColorCombo } = require('./models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const addColor = async () => {
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

const addColorCombo = async () => {
  try {
    const combo = await new ColorCombo({
      contrast_ratio: 8,
      w3_grade: 'AAA',
      color1: 'fff000',
      color2: '000fff'
    })
    await combo.save()
    console.log('Created colorCombo!')
  } catch (error) {
    throw error
  }
}

const run = async () => {
  // await addColor()
  await addColorCombo()
  db.close()
}

run()

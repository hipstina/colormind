const db = require('./db')
const { Color } = require('./models')
const { ColorCombo } = require('./models')
const { Collection } = require('./models')

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
      color1: 'f0f000',
      color2: '00ffff'
    })
    await combo.save()
    console.log('Created colorCombo!')
  } catch (error) {
    throw error
  }
}

const getCollection = async () => {
  try {
    const collection = await Collection.find()
    return {
      msg: ` collection: ${collection}`
    }
  } catch (error) {
    throw error
  }
}

const createCollection = async () => {
  try {
    const allCombos = await ColorCombo.find()

    const collection = await new Collection({
      alias: 'Test-collection',
      palettes: allCombos
    })
    return {
      msg: ` collection: ${allCombos}`
    }
  } catch (error) {
    throw error
  }
}

const run = async () => {
  // await addColor()
  // await addColorCombo()
  await createCollection()
  db.close()
}

run()

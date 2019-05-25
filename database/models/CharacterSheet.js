const mongoose = require('mongoose');

const CharacterSheetSchema = new mongoose.Schema({
  uuid: { type: String, default: '' },
  characterName: { type: String, default: '' },
  charClassArray: [
    {
      class: String,
      level: Number
    }
  ],
  exp: { type: Number, default: 0 },
  race: { type: String, default: '' },
  alignment: { type: String, default: '' },
  str: { type: Number, default: 0 },
  dex: { type: Number, default: 0 },
  con: { type: Number, default: 0 },
  int: { type: Number, default: 0 },
  wis: { type: Number, default: 0 },
  cha: { type: Number, default: 0 },
  proficienciesArray: [String],
  inspiration: { type: Number, default: 0 },
  armorClass: { type: Number, default: 0 },
  initiative: { type: Number, default: 0 },
  speed: { type: Number, default: 0 },
  hpMax: { type: Number, default: 0 },
  hpCurrent: { type: Number, default: 0 },
  hpTemp: { type: Number, default: 0 },
  hitDice: { type: String, default: '' },
  dsSuccesses: { type: Number, default: 0 },
  dsFails: { type: Number, default: 0 },
  attacksArray: [
    {
      attackName: String,
      attackBonus: Number,
      atkDmgDno: Number,
      atkDmgDice: String,
      atkDmgDnoSec: Number,
      atkDmgDiceSec: String,
      damageBonus: Number,
      damageType: String,
      attackRange: Number
    }
  ],
  spellCastingArray: [
    {
      spellCastingClass: String,
      spellCastingAbility: String,
      spellSaveDc: Number,
      spellAttackBonus: Number
    }
  ],
  spellsArray: [
    {
      level: Number,
      slots: Number,
      slotsExpended: Number,
      spellList: [{
        spellName: String,
        isPrepared: Boolean
      }]
    }
  ],
  equipment: { type: String, default: '' },
  inventory: { type: String, default: '' },
  copper: { type: Number, default: 0 },
  silver: { type: Number, default: 0 },
  electrum: { type: Number, default: 0 },
  gold: { type: Number, default: 0 },
  platinum: { type: Number, default: 0 },
  personality: { type: String, default: '' },
  ideals: { type: String, default: '' },
  bonds: { type: String, default: '' },
  flaws: { type: String, default: '' },
  features: { type: String, default: '' },
  background: { type: String, default: '' }
});

module.exports = CharacterSheetSchema;

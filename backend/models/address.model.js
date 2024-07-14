import { Schema, model } from 'mongoose';

const barangaySchema = new Schema({
  name: { type: String, required: true }
});

const municipalitySchema = new Schema({
  name: { type: String, required: true },
  barangay_list: [barangaySchema]
});

const provinceSchema = new Schema({
  name: { type: String, required: true },
  municipality_list: { type: Map, of: municipalitySchema }
});

const regionSchema = new Schema({
  region_name: { type: String, required: true },
  province_list: { type: Map, of: provinceSchema }
});

const Region = model('Region', regionSchema, 'region_provinces');

export { Region };
import { keyBy } from 'lodash';

import uuidv1 from 'uuid/v1';

import operatorDefs from '../defaults/operators.json';

// Accepts an ArcGIS fields definition and returns an array of fields for filtering
export function getFields(fieldsDefinition) {
  const def = Object.keys(fieldsDefinition).map(key => {
    const { alias, length, name, nullable, type, domain } = fieldsDefinition[
      key
    ];
    return {
      alias,
      length,
      name,
      nullable,
      type,
      domain
    };
  });

  return getFieldsLookup(def);
}

export function getDefaultFilterValue(field) {
  if (field.domain && field.domain.codedValues) {
    return field.domain.codedValues[0];
  }

  return { name: '', code: '' };
}

export function getValidOperators(fieldType) {
  // strings: 'esriFieldTypeString',
  // dates: 'esriFieldTypeDate',
  // numbers: ['esriFieldTypeOID',
  //           'esriFieldTypeSmallInteger',
  //           'esriFieldTypeInteger',
  //           'esriFieldTypeSingle',
  //           'esriFieldTypeDouble'],

  return operatorDefs[getGenericFieldType(fieldType)];
}

export function getGenericFieldType(fieldType) {
  switch (fieldType) {
    case 'esriFieldTypeString':
      return 'string';
    case 'esriFieldTypeOID':
    case 'esriFieldTypeSmallInteger':
    case 'esriFieldTypeInteger':
    case 'esriFieldTypeSingle':
    case 'esriFieldTypeDouble':
      return 'number';
    case 'esriFieldTypeDate':
      return 'date';
    default:
      console.warn('Invalid field type!');
      return null;
  }
}

export function generateId() {
  return uuidv1();
}

//
// PRIVATE METHODS
//

function getFieldsLookup(fields) {
  return keyBy(fields, 'name');
}

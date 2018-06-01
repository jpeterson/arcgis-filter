import { keyBy } from 'lodash';

import uuidv1 from 'uuid/v1';

import operatorDefs from '../defaults/operators';

export function getDefaultFilterValue(field) {
  if (field.domain && field.domain.codedValues) {
    return field.domain.codedValues[0];
  }

  return { name: '', code: '' };
}

export function getValidOperators(fieldType) {
  const operators = operatorDefs[getGenericFieldType(fieldType)];

  return operators || [];
}

export function getGenericFieldType(fieldType) {
  // REST API Field Types
  // strings: 'esriFieldTypeString',
  // dates: 'esriFieldTypeDate',
  // numbers: ['esriFieldTypeOID',
  //           'esriFieldTypeSmallInteger',
  //           'esriFieldTypeInteger',
  //           'esriFieldTypeSingle',
  //           'esriFieldTypeDouble'],

  // JSAPI Field Types
  //small-integer | integer | single | double | long | string | date | oid | geometry | blob | raster | guid | global-id | xml

  switch (fieldType) {
    case null:
      return null;

    case 'esriFieldTypeString':
    case 'esriFieldTypeGUID':
    case 'oid':
    case 'guid':
    case 'global-id':
    case 'string':
      return 'string';

    case 'esriFieldTypeOID':
    case 'esriFieldTypeSmallInteger':
    case 'esriFieldTypeInteger':
    case 'esriFieldTypeSingle':
    case 'esriFieldTypeDouble':
    case 'small-integer':
    case 'integer':
    case 'single':
    case 'double':
    case 'long':
      return 'number';

    case 'esriFieldTypeDate':
    case 'date':
      return 'date';

    default:
      console.warn('Invalid field type! Defaulting to string.', fieldType);
      return 'string';
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

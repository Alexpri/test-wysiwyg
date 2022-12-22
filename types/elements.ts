export enum ELEMENT_TYPES {
  DIVIDER = 'Divider',
  INPUT_NUMBER = 'Number',
  INPUT_TEXT = 'Input',
  INPUT_CHECKBOX = 'Checkbox',
}

export enum ELEMENT_NUMBER_TYPES {
  DIVIDER = 1,
  INPUT_NUMBER = 2,
  INPUT_TEXT = 3,
  INPUT_CHECKBOX = 4,
}

export interface OptionData {
  title: ELEMENT_TYPES
  id: ELEMENT_NUMBER_TYPES
}

export interface MainElement {
  typeId: ELEMENT_NUMBER_TYPES
  order: number
  id: string
  fieldId: string
  name: string
  default: string
  required: boolean
}

export interface UpdateIdEvent {
  value: string
  id: string
  type?: ELEMENT_TYPES
}


export interface UpdateTypeEvent {
  value: ELEMENT_NUMBER_TYPES
  id: string
  type?: ELEMENT_TYPES
}

export interface UpdateRequiredEvent {
  value: boolean
  id: string
}

export interface UpdateInputEvent {
  value: string
  id: string
}
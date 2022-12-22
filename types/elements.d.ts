interface OptionData {
  title: string
  id?: number
}

interface DividerItem extends MainElement {
  type: ELEMENT_TYPES.DIVIDER
}

interface InputNumberItem extends MainElement {
  type: ELEMENT_TYPES.INPUT_NUMBER
}

interface InputTextItem extends MainElement {
  type: ELEMENT_TYPES.INPUT_TEXT
}

interface InputCheckboxItem extends MainElement {
  type: ELEMENT_TYPES.INPUT_CHECKBOX
}

interface MainElement {
  order: number
  id: string
  name: string
  default: string
  required: boolean
}

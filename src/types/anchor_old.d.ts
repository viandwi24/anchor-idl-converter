export interface Root {
  version: string
  name: string
  instructions: Instruction[]
  accounts: Account2[]
  types: Type2[]
  errors: Error[]
  metadata: Metadata
}

export interface Instruction {
  name: string
  accounts: Account[]
  args: Arg[]
}

export interface Account {
  name: string
  isMut: boolean
  isSigner: boolean
}

export interface Arg {
  name: string
  type: string
}

export interface Account2 {
  name: string
  type: Type
}

export interface Type {
  kind: string
  fields: Field[]
}

export interface Field {
  name: string
  type: string
}

export interface Type2 {
  name: string
  type: Type3
}

export interface Type3 {
  kind: string
  variants: Variant[]
}

export interface Variant {
  name: string
}

export interface Error {
  code: number
  name: string
  msg: string
}

export interface Metadata {
  address: string
}
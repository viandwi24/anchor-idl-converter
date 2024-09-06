export interface Root {
  address: string
  metadata: Metadata
  instructions: Instruction[]
  accounts: Account2[]
  types: Type[]
}

export interface Metadata {
  name: string
  version: string
  spec: string
  description: string
}

export interface Instruction {
  name: string
  discriminator: number[]
  accounts: Account[]
  args: Arg[]
}

export interface Account {
  name: string
  pda?: Pda
  writable?: boolean
  signer?: boolean
  address?: string
}

export interface Pda {
  seeds: Seed[]
}

export interface Seed {
  kind: string
  value?: number[]
  path?: string
}

export interface Arg {
  name: string
  type: any
}

export interface Account2 {
  name: string
  discriminator: number[]
}

export interface Type {
  name: string
  type: Type2
}

export interface Type2 {
  kind: string
  fields?: Field[]
  variants?: Variant[]
}

export interface Field {
  name: string
  type: any
}

export interface Variant {
  name: string
}
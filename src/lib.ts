import { type Root as AnchorIDLNew } from './types/anchor_new'
import { type Root as AnchorIDLOld } from './types/anchor_old'

export const convertSnakeCaseToCamelCase = (str: string) => {
  // ex: create_item_collection -> createItemCollection
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase())
}
export function convertType(type: any, data?: any): any {
  if (type.kind === 'struct') {
    return {
      kind: 'struct',
      fields: type.fields.map((field: any) => ({
        name: convertSnakeCaseToCamelCase(field.name),
        type: convertType(field.type, data)
      }))
    };
  }
  
  if (type.kind === 'enum') {
    return {
      kind: 'enum',
      variants: type.variants.map((variant: any) => ({
        name: convertSnakeCaseToCamelCase(variant.name)
      }))
    };
  }
  
  if (type.kind === 'option') {
    return {
      kind: 'option',
      defined: convertType(type.defined, data)
    };
  }
  
  if (type.kind === 'array') {
    return {
      kind: 'array',
      type: convertType(type.type, data),
      length: type.length
    };
  }

  if (type == 'pubkey' || type['type'] == 'pubkey') {
    return 'publicKey';
  }

  if (type && type.option) {
    if (type.option?.defined) {
      const typename = type.option.defined.name
      // const searchtypeIntypes = (data as Type1Root).types.find((t: any) => t.name === typename)
      return { defined: typename }
    }
    return type
  }
  
  // Handle primitive types directly
  return type;
}
export function anchorIDLConvertNewToOld(data: AnchorIDLNew): AnchorIDLOld {
  return {
    version: data.metadata.version,
    name: data.metadata.name,
    instructions: data.instructions.map((instruction) => ({
      name: convertSnakeCaseToCamelCase(instruction.name),
      accounts: instruction.accounts.map((account) => ({
        name: convertSnakeCaseToCamelCase(account.name),
        isMut: account.writable || false,
        isSigner: account.signer || false,
      })),
      args: instruction.args.map((arg) => ({
        name: convertSnakeCaseToCamelCase(arg.name),
        type: convertType(arg.type, data),
      })),
    })),
    accounts: data.accounts.map((account) => ({
      name: account.name,
      type: convertType(data.types.find((type) => type.name === account.name)?.type, data),
    })),
    types: data.types.map((type) => ({
      name: type.name,
      type: convertType(type.type),
    })),
    errors: data.instructions.flatMap((instruction) => 
      instruction.args.filter((arg) => arg.type.kind === 'error').map((arg) => ({
        code: 0, // Placeholder, as there are no codes in the example.
        name: arg.name,
        msg: 'Error message' // Placeholder, as there are no error messages in the example.
      }))
    ),
    metadata: {
      address: data.address
    },
  };
}
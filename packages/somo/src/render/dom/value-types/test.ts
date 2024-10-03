import { ValueType } from "../../../value/types/types"

/**
 * Tests a provided value against a ValueType
 */
export const testValueType = (v: any) => (type: ValueType) => type.test(v)

import 'dotenv/config';
import keyExtractChain from './key-extract-chain';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { ZettaCustomerSchema } from 'src/infra/services/zetta/schema';
import type { JSONSchema7 } from 'json-schema';

(async () => {
  const zettaCustomerSchema = zodToJsonSchema(
    ZettaCustomerSchema,
  ) as JSONSchema7;
  const resposta = await keyExtractChain.invoke({
    schema: JSON.stringify(zettaCustomerSchema),
    entry:
      'Preciso fazer um pix para os clientes que se chamam "Vitor", me passe o id das pessoas e a conta bancária',
  });
  console.log(resposta.split(';'));
})();

import {
  PunkTransfer as PunkTransferEvent,
  cryptopunks as CryptopunksContract
} from "../generated/cryptopunks/cryptopunks"
import {
  Account,
  Token,
} from "../generated/schema"



export function handlePunkTransfer(event: PunkTransferEvent): void {

  let cryptopunksContract = CryptopunksContract.bind(event.address);
  let token = Token.load(event.params.punkIndex.toString());
  if(!token){
    token = new Token(event.params.punkIndex.toString());
  }
  token.owner = event.params.to.toHexString();
  token.save();
  let account = Account.load(event.params.to.toHexString());
  if (!account) {
    account = new Account(event.params.to.toHexString());
    account.save();
  }
}

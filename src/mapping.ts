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
  let punkAddress = cryptopunksContract.punkIndexToAddress(event.params.punkIndex);
  let token = Token.load(punkAddress.toHexString());
  if(!token){
    token = new Token(punkAddress.toHexString());
    token.punkIndex = event.params.punkIndex;
  }
  token.owner = event.params.to.toHexString();
  token.save();
  let account = Account.load(event.params.to.toHexString());
  if (!account) {
    account = new Account(event.params.to.toHexString());
    account.save();
  }
}

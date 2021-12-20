import {
    PunkTransfer as PunkTransferEvent,
    Assign as AssignEvent,
    cryptopunks as CryptopunksContract
} from "../generated/cryptopunks/cryptopunks"
import {
    Account,
    Token,
} from "../generated/schema"
import {BigInt} from "@graphprotocol/graph-ts";


export function handlePunkTransfer(event: PunkTransferEvent): void {

    let token = Token.load(event.params.punkIndex.toString());
    if (!token) {
        token = new Token(event.params.punkIndex.toString());
        token.punkIndex = event.params.punkIndex
    }
    token.owner = event.params.to.toHexString();
    token.save();
    let accountTo = Account.load(event.params.to.toHexString());
    if (!accountTo) {
        accountTo = new Account(event.params.to.toHexString());
        accountTo.punkNumber = BigInt.fromI32(0);
    }
    accountTo.punkNumber = accountTo.punkNumber.plus(
        BigInt.fromI32(1)
    );
    accountTo.save();
    let accountFrom = Account.load(event.params.from.toHexString());
    if (!accountFrom) {
        accountFrom = new Account(event.params.from.toHexString());
        accountFrom.punkNumber = BigInt.fromI32(0);
    }
    accountTo.punkNumber = accountTo.punkNumber.minus(
        BigInt.fromI32(1)
    );
    accountFrom.save();
}

export function handleAssign(event: AssignEvent): void {
    let token = Token.load(event.params.punkIndex.toString());
    if (!token) {
        token = new Token(event.params.punkIndex.toString());
        token.punkIndex = event.params.punkIndex
    }
    token.owner = event.params.to.toHexString();
    token.save();
    let accountTo = Account.load(event.params.to.toHexString());
    if (!accountTo) {
        accountTo = new Account(event.params.to.toHexString());
        accountTo.punkNumber = BigInt.fromI32(0);
    }
    accountTo.punkNumber = accountTo.punkNumber.plus(
        BigInt.fromI32(1)
    );
    accountTo.save();

}

pragma solidity ^ 0.4 .11;
contract BasicEscrow {
    uint public balance;
    address public buyer;
    address public seller;
    address private escrow;
    uint private start;
    bool public buyerVoted;
    bool public sellerVoted;
    bool public offerAccepted;
    bool public buyerOk;
    bool public sellerOk;
    

    // create the smart contract and deposit the funds into escrow
    constructor(address seller_address) public payable {
        // this is the constructor function that runs ONCE upon initialization
        buyer = msg.sender;
        seller = seller_address;
        escrow = 0x96b78740DC0c15B79E3bb0037A2c90576148ECAC;
        balance += msg.value;
        start = now; //now is an alias for block.timestamp, not really "now"
    }

    // user accepts the transaction
    function accept() public {
        assert(offerAccepted);
        if (msg.sender == buyer) {
            buyerOk = true;
            buyerVoted = true;
        } else if (msg.sender == seller) {
            sellerOk = true;
            sellerVoted = true;
        }
        if (buyerOk && sellerOk && buyerVoted && sellerVoted) {
            payBalance();
        } else if (buyerOk && !sellerOk && now > start + 30 days) {
            // Freeze 30 days before release to buyer. The customer has to remember to call this method after freeze period.
            selfdestruct(buyer);
        }
    }

    // transfer funds from smart contract to seller
    function payBalance() private {
        seller.transfer(balance);
        balance = 0;
    }

    // buyer may deposit additional funds into the contract if pleased
    function deposit() public payable {
        if (msg.sender == buyer) {
            balance += msg.value;
        }
    }

    // user rejects the transaction
    function cancel() public {
        assert(offerAccepted);
        if (msg.sender == buyer) {
            buyerOk = false;
            buyerVoted = true;
        } else if (msg.sender == seller) {
            sellerOk = false;
            sellerVoted = true;
        }
        // if both buyer and seller would like to cancel, money is returned to buyer 
        if (!buyerOk && !sellerOk && buyerVoted && sellerVoted) {
            selfdestruct(buyer);
        }
    }
    
    // allows escrow manager and seller to do full or partial refunds
    function refund(uint amount) public {
        assert(msg.sender == escrow || msg.sender == seller);
        assert(amount <= balance);
        buyer.transfer(amount);
        balance -= amount;
    }
    
    // allows the buyer to reclaim funds and destroy the contract if the seller has not yet accepted the transaction
    function buyerRefund() public {
        assert(msg.sender == buyer);
        assert(!offerAccepted);
        selfdestruct(buyer);
    }

    // removes the contract from the blockchain and returns all deposited funds to the buyers
    // can only be executed after both parties voted but the transaction was not fulfilled
    function kill() public {
        assert(sellerVoted && buyerVoted);
        if (msg.sender == escrow) {
            selfdestruct(buyer);
        }
    }
}
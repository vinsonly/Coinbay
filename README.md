# CoinBay 
## Setup Instructions
1. Run ```$ vagrant up```
2. Navigate to project dir ~/coinbay-web-app/  
3. In the root/client dir, run ```$ yarn install```
4. Do the same in root/server dir, run ```$ yarn install```
5. Back in root dir, run the initial data script ```$ ./resetdb.sh ```
6. And now we can launch the app using ```$ yarn dev```
7. Open your browser and navigate to http://localhost:8000/ to view the CoinBay app
8. You can register a new account or use a default user as listed below:
- *Username: user1 (Password: user1) 
- *Username: user2 (Password: user2)
    - *These accounts will have some postings assigned to their account so that you can immediately view and use functionality within the profile dashboard
## Transaction Workflow
Follow the steps listed below for setting up and testing the transaction (escrow) process 
- https://docs.google.com/document/d/1bUKYl6C1ZQrLa4gN1gG0-LMMjQoN7OE2ZUx7OLtJB2o/edit?usp=sharing

# Features (End-User)
## Database keyword search
- Reactive search results/suggestions for top 100 relevant postings
- Can search by “user” or “title” depending on dropdown selection (bottom-right of search)

## Sorting
- Filter by date (ascending/descending)
- Filter by price (high/low)
- Filter by title (A-Z/ Z-A)

## Categorical Filtering
- Fully responsive layout with ability to expand/collapse drawer for smaller screen sizes

## Marketplace Layouts
- Grid, Detailed-List, and List views 

## Google Maps API
- Integration with the API allows users to pin a location on a map during posting creation
- Known issue: The Google Map API for React component currently does not properly save the user’s location after posting is saved
- Future work: include a search bar

## Using Imgur API
- Allow users to upload an image file for their posting; imgur handles the upload, hosting, and URL creation which is later referenced in the posting details

## Posting CRUD
- Full suite of functionality pertaining to postings in the marketplace (some features require you to be an owner of the posting) 
- There is an image size constraint for non-animated images (i.e. JPG, PNG, etc) is 20MB, anything larger will not be permitted during posting creation

## Lazy Loading
- Scrolling to bottom of the page triggers a fetch to load more posts

# Features (Back-end)
## Session Tokens 
- Session handling fully implemented using JWT (Json Web Tokens) 
- User sessions means improved security and usability

## Secure Endpoints
- Fully secured endpoints removes potential for unauthorized access

## Fake Data Generation
- Using Faker API to generate customizeable (fake) data for various components/fields (e.g. Title, User, Reviews, Description, Address, Phone Number, etc.)
- Populated through Sequelize seed files
- Default generation is 1000 users and 1000 posts, can be easily modified with a variable change (must remain 1:1 in the file)

## Ethereum Smart-Contract Integration for Escrow Transactions
- *Buy Now button will not work without MetaMask Extension*
- Integrated with MetaMask, which is a Chrome extension that allows users to interface with the Ethereum - Blockchain without hosting a full node.
- Wallet balance on top right fetched from Metamask
- Can be used as an escrow through Smart Contracts
- Connected to Ropsten Testnet, identical to Mainnet except with fake money
- Transactions are done through Smart Contracts
- When a user clicks “buy now” the item will be “unavailable”
- Can view the Ethereum transaction on Ropsten’s Etherscan
    - Example: https://ropsten.etherscan.io/tx/0x4940cdd9db4394c5ae0d82c85aacaca4ccd4ec1688ca87fa6cc099fe6cce039f
- All transaction scenarios accounted for:
    - Both users accept transaction, Ether is sent from the contract to the seller
    - Both users decline transaction, Ether is returned from the smart contract to the buyer
    - One user declines, If there is conflict where one user accepts and one user declines the transaction, a third party or administrator will be referred to to resolve potential conflicts
- We keep a full history of all transactions performed on our web app
Ethereum Wallet Balance in the NavBar is updated live when a user switches wallets or completes a transaction


# Videos (Screen Recordings)
## Searching & Registration Workflow: 
- https://drive.google.com/open?id=1Eomh3whoNRRYFnFCvqxuHJdKCWBFoHB3

## CRUD Postings Workflow:
- https://drive.google.com/open?id=16sBLdIIC8AKQKOYwphKs_4stFWkgGPif

##Transaction Workflow:
- https://drive.google.com/open?id=1N5Wsu0N-ZMG9mKe7bJNHMQCoUcjjDeKy





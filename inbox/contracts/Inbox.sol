pragma solidity ^0.6.4;

contract Inbox {
    string public message;

    function set(string memory initialMessage) public {
        message = initialMessage;
    }

    function get() public view returns (string memory) {
        return message;
    }
}
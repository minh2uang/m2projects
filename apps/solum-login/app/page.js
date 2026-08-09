'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const LogIn_1 = __importDefault(require("./LogIn"));
const HomePage_1 = __importDefault(require("./HomePage"));
function Home() {
    const [signedInEmailAddress, setSignedInEmailAddress] = (0, react_1.useState)();
    const signOut = () => setSignedInEmailAddress(undefined);
    const onSignInSuccessfully = (emailAddress) => setSignedInEmailAddress(emailAddress);
    if (!!signedInEmailAddress) {
        // Render when the user's signed in
        return (<HomePage_1.default signedInEmailAddress={signedInEmailAddress} signOut={signOut}/>);
    }
    // If not signed in display the log in page
    return <LogIn_1.default onSignInSuccessfully={onSignInSuccessfully}/>;
}
exports.default = Home;

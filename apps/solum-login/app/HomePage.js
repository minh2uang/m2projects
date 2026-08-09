"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const HomePage = ({ signedInEmailAddress, signOut }) => {
    return (<material_1.Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} height="100vh">
      <material_1.Typography variant="h5">{`Welcome, ${signedInEmailAddress}`}</material_1.Typography>
      <material_1.Button fullWidth={false} onClick={signOut}>
        Log Out
      </material_1.Button>
    </material_1.Box>);
};
exports.default = HomePage;

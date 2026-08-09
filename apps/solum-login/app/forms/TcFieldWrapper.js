"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const TcFieldWrapper = ({ children, error, info, isDirty }) => {
    return (<material_1.Tooltip arrow title={info} placement="top">
      <material_1.Box>
        {children}
        {error && isDirty && (<material_1.Typography color="error" variant="body2">
            {error}
          </material_1.Typography>)}
      </material_1.Box>
    </material_1.Tooltip>);
};
exports.default = TcFieldWrapper;

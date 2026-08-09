"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_1 = require("@mui/material");
const TcFieldWrapper_1 = __importDefault(require("./TcFieldWrapper"));
const TcTextField = ({ onChange, error, isDirty, value, info, ...props }) => {
    return (<TcFieldWrapper_1.default isDirty={isDirty} error={error} info={info}>
      <material_1.TextField fullWidth size="small" {...props} InputLabelProps={{ shrink: true }} value={value || ''} onChange={({ target }) => onChange(target.value)}/>
    </TcFieldWrapper_1.default>);
};
exports.default = TcTextField;

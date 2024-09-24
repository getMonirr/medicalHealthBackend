"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorServices = void 0;
const doctor_model_1 = __importDefault(require("./doctor.model"));
// get doctors with specialty filter
const getDoctors = (specialty) => __awaiter(void 0, void 0, void 0, function* () {
    if (specialty) {
        return yield doctor_model_1.default.find(specialty).limit(6);
    }
    else {
        return yield doctor_model_1.default.find().limit(6);
    }
});
// export doctor service
exports.doctorServices = {
    getDoctors,
};

import { parseFile } from "./fileParser.mjs";

const textFilePath = "../power_data.txt"; //TODO: remove relative path in final version, as this file will always be in PWD

parseFile(textFilePath);

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchQueue = void 0;
class BatchQueue {
    constructor(flushFn, maxSize = 100, flushInterval = 5000 // 5s
    ) {
        this.flushFn = flushFn;
        this.maxSize = maxSize;
        this.flushInterval = flushInterval;
        this.buffer = [];
        this.interval = setInterval(() => this.flush(), this.flushInterval);
    }
    push(item) {
        this.buffer.push(item);
        if (this.buffer.length >= this.maxSize)
            this.flush();
    }
    flush() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.buffer.length === 0)
                return;
            const items = this.buffer;
            this.buffer = [];
            try {
                yield this.flushFn(items);
            }
            catch (error) {
                console.error(`Batch flush failed: ${error}`);
                this.buffer.push(...items); // requeue on failure
            }
        });
    }
}
exports.BatchQueue = BatchQueue;

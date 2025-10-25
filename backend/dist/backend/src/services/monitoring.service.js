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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringService = void 0;
const os_1 = __importDefault(require("os"));
const client_1 = __importDefault(require("../db/client"));
const queue_1 = require("../lib/queue");
const system_metrics_1 = require("@shared-types/system-metrics");
class MonitoringService {
    //   static SYSTEM_METRIC_INTERVAL = 10000; // 10s
    //   static systemMetricIntervalId: NodeJS.Timeout;
    static recordResponseLog(responseLog) {
        return __awaiter(this, void 0, void 0, function* () {
            this.responseLogBatchQueue.push(responseLog);
        });
    }
    static recordAdminLog(adminLog) {
        this.adminLogBatchQueue.push(adminLog);
    }
    static recordUserLog(userLog) {
        this.userLogBatchQueue.push(userLog);
    }
    static getSystemMetrics() {
        /* If you have N cores, then:
            A load of N means 100% utilization (all cores fully busy on average).
            A load below N means CPU is not fully loaded.
            A load above N means more processes are waiting — the system is overloaded.
        */
        const load = os_1.default.loadavg()[0]; // 1-min avg
        const cores = os_1.default.cpus().length; // number of cores
        let cpuCondition = "CRITICAL";
        if (load < cores * 0.5)
            cpuCondition = "IDLE"; // CPU mostly idle
        else if (load < cores)
            cpuCondition = "MODERATE"; // CPU active but not overloaded
        else if (load >= cores)
            cpuCondition = "HIGH"; // CPU fully used or overloaded
        else if (load >= cores * 1.5)
            cpuCondition = "CRITICAL"; // CPU heavily overloaded
        return {
            // cpuUsage: os.loadavg()[0], // 1-min avg
            cpuCondition: system_metrics_1.CPU_CONDITION[cpuCondition],
            cpuLoadPercent: (load / cores) * 100,
            memoryUsage: process.memoryUsage().rss / 1024 / 1024, // in MB
            totalMemory: os_1.default.totalmem() / 1024 / 1024, // in MB
            uptime: Math.floor(process.uptime()),
            timestamp: new Date(),
        };
    }
}
exports.MonitoringService = MonitoringService;
_a = MonitoringService;
MonitoringService.RES_BUFFER_SIZE = 100;
MonitoringService.RES_FLUSH_INTERVAL = 10000; // 10s
MonitoringService.ADMIN_BUFFER_SIZE = 100;
MonitoringService.ADMIN_FLUSH_INTERVAL = 10000; // 10s
MonitoringService.USER_BUFFER_SIZE = 100;
MonitoringService.USER_FLUSH_INTERVAL = 10000; // 10s
MonitoringService.responseLogBatchQueue = new queue_1.BatchQueue((logs) => __awaiter(void 0, void 0, void 0, function* () {
    if (logs.length > 0)
        yield client_1.default.responseLog.createMany({ data: logs });
}), _a.RES_BUFFER_SIZE, _a.RES_FLUSH_INTERVAL);
MonitoringService.adminLogBatchQueue = new queue_1.BatchQueue((logs) => __awaiter(void 0, void 0, void 0, function* () {
    if (logs.length > 0)
        yield client_1.default.adminLog.createMany({ data: logs });
}), _a.ADMIN_BUFFER_SIZE, _a.ADMIN_FLUSH_INTERVAL);
MonitoringService.userLogBatchQueue = new queue_1.BatchQueue((logs) => __awaiter(void 0, void 0, void 0, function* () {
    if (logs.length > 0)
        yield client_1.default.userLog.createMany({ data: logs });
}), _a.USER_BUFFER_SIZE, _a.USER_FLUSH_INTERVAL);

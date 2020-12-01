"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Environments;
(function (Environments) {
    Environments["local_environment"] = "local";
    Environments["dev_environment"] = "dev";
    Environments["prod_environment"] = "prod";
})(Environments || (Environments = {}));
class Environment {
    constructor(environment) {
        this.environment = environment;
    }
    getPort() {
        if (this.environment === Environments.prod_environment) {
            return 8082;
        }
        else if (this.environment === Environments.dev_environment) {
            return 8081;
        }
        else {
            return 8080;
        }
    }
    getDBName() {
        if (this.environment === Environments.prod_environment) {
            return 'db_gmao_prod';
        }
        else if (this.environment === Environments.dev_environment) {
            return 'db_gmao_dev';
        }
        else {
            return 'db_gmao_prod';
        }
    }
}
exports.default = new Environment(Environments.local_environment);

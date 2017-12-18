"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Groups;
(function (Groups) {
    class GroupMananger {
        static getGroup(group) {
            return GroupMananger.groups.get(group);
        }
        static setGroup(groupName, group) {
            GroupMananger.groups.set(groupName, group);
        }
    }
    GroupMananger.groups = new Map();
    Groups.GroupMananger = GroupMananger;
    let GroupName;
    (function (GroupName) {
        GroupName["ENEMIES"] = "entites";
        GroupName["GAME_LAYER"] = "game_layer";
        GroupName["DISASTER_BULLETS"] = "disaster_Bullets";
        GroupName["POWER_UPS"] = "power_ups";
    })(GroupName = Groups.GroupName || (Groups.GroupName = {}));
})(Groups = exports.Groups || (exports.Groups = {}));
//# sourceMappingURL=groupMananger.js.map
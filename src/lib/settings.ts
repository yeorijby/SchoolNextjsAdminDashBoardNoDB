export const ITEM_PER_PAGE = 10;

type RouteAccessMap = {
    [key:string]:string[];
}

export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)":["admin"],
    "/student(.*)":["student"],
    "/teacher(.*)":["teacher"],
    "/parent(.*)":["parent"],
    "/list/teachers":["admin", "teacher"],
    "/list/students":["admin", "student"],
    "/list/parents":["admin", "parent"],
    "/list/subjects":["admin"],
    "/list/classes":["admin", "teacher"],
    "/list/exams":["admin", "teacher", "student", "parent"],
    "/list/assignments":["admin", "teacher", "student", "parent"],
    "/list/results":["admin", "teacher", "student", "parent"],
    "/list/attendence":["admin", "teacher", "student", "parent"],
    "/list/events":["admin", "teacher", "student", "parent"],
    "/list/announcements":["admin", "teacher", "student", "parent"],
};
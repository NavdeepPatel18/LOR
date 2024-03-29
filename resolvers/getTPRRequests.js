const { getDBInstance } = require("./operations");
const db = getDBInstance();

exports.getTPRRequests = async (email) => {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT fp.id, usr.charusat_id, CONCAT_WS(" ", usr.first_name, usr.last_name) as stu_name, fp.remark, fp.upload_lor, 
        (SELECT lr.lor_status FROM lor.lor_request lr WHERE lr.user_id=fp.user_id) as status
        FROM lor.faculty_pref fp, lor.user usr 
        WHERE fp.faculty_email=? AND fp.user_id=usr.id`,
        [email],
        (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                if (result.length !== 0) {
                    resolve(result);
                } else {
                    reject(new Error("Can't fetch the requests"));
                }
            }
        });
    });
};
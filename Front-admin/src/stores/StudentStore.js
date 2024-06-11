import { makeAutoObservable, runInAction } from "mobx";
import { API_URL_STUDENTS } from "./config";
import Student from "./Student";

class StudentStore {
    _course = "B.U.T MMI";
    _loading;
    _error;
    _students;
    constructor() {
        this._students = [];
        this._loading = true;
        this._error = null;
        makeAutoObservable(this);
        this.loadStudents();
    }

    async loadStudents() {
        try {
            let students = await fetch(API_URL_STUDENTS).then((value) => value.json());
            runInAction(() => {
                this._students = students.map((student) => new Student(student));
                this._students = this._students.sort((a, b) => a.fullName.localeCompare(b.fullName));
                this._loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error;
                this._loading = false;
            });
        }
    }

    get course() {
        return this._course;
    }

    get students() {
        return this._students;
    }

    set students(value) {
        this._students = value;
    }

    get loading() {
        return this._loading;
    }

    get groups() {
        const groups = new Set(this._students.map(student => student.group))
        return [...groups].sort();
    }

    getStudentByGroup(groupName) {
        const studentsFromGroup = this._students.filter(student => student.group === groupName);
        return studentsFromGroup
    }

    getStudentById(id) {
        return this._students.find((student) => student.id === id)
    }

    async updateStudent(data) {
        let student = this.getStudentById(data.id);
        if (!student) {
            return { success: false, message: "Etudiant inexistant" };
        } else {
            try {
                const response = await fetch(`${API_URL_STUDENTS}/${student.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    let { id, ...updatedData } = data;
                    runInAction(() => {
                        Object.assign(student, updatedData);
                    });
                    return { success: true, message: "Etudiant modifié" };
                } else {
                    return { success: false, message: `Request failed with status ${response.status}` };
                }
            } catch (error) {
                return { success: false, message: `${error}` };
            }
        }
    }




}
export default StudentStore;
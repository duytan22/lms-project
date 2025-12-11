const STORAGE_KEY = 'lms_courses_v1';

const sample = [
    {
        id: '1',
        name: 'Intro to Networking',
        category: 'Networking',
        level: 'Beginner',
        numberOfLesson: 12,
        description: 'Basic networking concepts',
        thumbnail: 'https://via.placeholder.com/120'
    }
];

export function loadCourses() {
    try {
        const r = localStorage.getItem(STORAGE_KEY);

        // Nếu chưa có dữ liệu thì tạo mới
        if (!r) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
            return sample;
        }

        return JSON.parse(r);
    } catch (e) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
        return sample;
    }
}

export function saveCourses(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); 
}

export function addCourse(course) {
    const list = loadCourses();
    const id = Date.now().toString();

    const c = { ...course, id };
    list.unshift(c);

    saveCourses(list);
    return c;
}

export function updateCourse(id, payload) {
    const list = loadCourses();
    const idx = list.findIndex((i) => i.id === id);

    if (idx === -1) throw new Error('Not found');

    list[idx] = { ...list[idx], ...payload };
    saveCourses(list);

    return list[idx];
}

export function deleteCourse(id) {
    const list = loadCourses();
    const next = list.filter((i) => i.id !== id);
    saveCourses(next);
}

export function getCourseById(id) {
    const list = loadCourses();
    return list.find((i) => i.id === id);
}

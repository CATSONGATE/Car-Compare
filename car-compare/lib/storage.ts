const KEY = 'car_compare:list';

export function loadCompare() {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function saveCompare(list: any[]) {
    localStorage.setItem(KEY, JSON.stringify(list));
}
function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }

export default (str: string, find: string, replace: string): string => {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
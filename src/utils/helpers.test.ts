import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from '../utils/helpers';

describe('Helper Functions', () => {
    it('should format currency correctly', () => {
        expect(formatCurrency(100)).toBe('$100.00');
        expect(formatCurrency(1234.56)).toBe('$1,234.56');
        expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should format dates correctly', () => {
        const date = '2023-12-25';
        // Match based on generic output since locale might vary in environment
        expect(formatDate(date)).toContain('2023');
        expect(formatDate(date)).toContain('Dec');
    });
});

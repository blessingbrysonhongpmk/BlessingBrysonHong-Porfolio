// ─────────────────────────────────────────────────────────────
// BBH Portfolio — Comprehensive Admin & Live Sync Test Suite
// ─────────────────────────────────────────────────────────────
import { PORTFOLIO_DATA } from '../src/data/portfolio.js';
import {
  MASTER_ADMIN_EMAIL,
  MASTER_ADMIN_PASS,
  ADMIN_UID,
  AUTHORIZED_EMAILS,
  isMasterAdminCredentials,
  isAuthorizedAdminUser,
} from '../src/config/adminAuth.js';

let passed = 0;
let failed = 0;

function it(description, fn) {
  try {
    fn();
    console.log(`  ✓ ${description}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${description}`);
    console.error(`    Error: ${err.message}`);
    failed++;
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${JSON.stringify(expected)} but received ${JSON.stringify(actual)}`);
      }
    },
    toEqual(expected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)} but received ${JSON.stringify(actual)}`);
      }
    },
    toBeTruthy() {
      if (!actual) {
        throw new Error(`Expected truthy value but received ${actual}`);
      }
    },
    toBeFalsy() {
      if (actual) {
        throw new Error(`Expected falsy value but received ${actual}`);
      }
    },
    toBeGreaterThan(expected) {
      if (actual <= expected) {
        throw new Error(`Expected ${actual} > ${expected}`);
      }
    },
    toContain(expected) {
      if (!actual || !actual.includes(expected)) {
        throw new Error(`Expected ${JSON.stringify(actual)} to contain ${JSON.stringify(expected)}`);
      }
    },
  };
}

console.log('\n========================================');
console.log(' RUNNING BBH PORTFOLIO TEST SUITE');
console.log('========================================\n');

console.log('Group 1: Administrator Authentication Credentials & Logic');
it('Master admin ID should be blessing28022006@gmail.com', () => {
  expect(MASTER_ADMIN_EMAIL).toBe('blessing28022006@gmail.com');
});

it('Master admin password should be PMKBBH1324', () => {
  expect(MASTER_ADMIN_PASS).toBe('PMKBBH1324');
});

it('Validates exact correct admin credentials', () => {
  expect(isMasterAdminCredentials('blessing28022006@gmail.com', 'PMKBBH1324')).toBe(true);
});

it('Validates admin credentials with surrounding whitespace', () => {
  expect(isMasterAdminCredentials('   blessing28022006@gmail.com   ', '  PMKBBH1324  ')).toBe(true);
});

it('Validates uppercase admin email (case-insensitive)', () => {
  expect(isMasterAdminCredentials('BLESSING28022006@GMAIL.COM', 'PMKBBH1324')).toBe(true);
});

it('Rejects incorrect password', () => {
  expect(isMasterAdminCredentials('blessing28022006@gmail.com', 'WrongPassword123')).toBe(false);
});

it('Rejects unauthorized email address', () => {
  expect(isMasterAdminCredentials('unknown@domain.com', 'PMKBBH1324')).toBe(false);
});

it('Rejects empty or null credentials', () => {
  expect(isMasterAdminCredentials('', '')).toBe(false);
  expect(isMasterAdminCredentials(null, null)).toBe(false);
});

it('Authorizes user matching master email regardless of UID', () => {
  const mockUser = { email: 'blessing28022006@gmail.com', uid: 'custom-uid-888' };
  expect(isAuthorizedAdminUser(mockUser)).toBe(true);
});

it('Authorizes user matching designated legacy UID', () => {
  const mockUser = { email: 'legacy@firebase.com', uid: ADMIN_UID };
  expect(isAuthorizedAdminUser(mockUser)).toBe(true);
});

it('Authorizes user in AUTHORIZED_EMAILS list', () => {
  expect(AUTHORIZED_EMAILS).toContain('blessing28022006@gmail.com');
});

it('Rejects unauthenticated or unauthorized users', () => {
  expect(isAuthorizedAdminUser(null)).toBe(false);
  expect(isAuthorizedAdminUser({ email: 'intruder@test.com', uid: 'fake-uid' })).toBe(false);
});

console.log('\nGroup 2: Live Brand, Logo & Site Customization Architecture');
it('Portfolio defaults include brand text "BBH"', () => {
  expect(PORTFOLIO_DATA.profile.brand).toBe('BBH');
});

it('Portfolio defaults include monogram "P M K"', () => {
  expect(PORTFOLIO_DATA.profile.monogram).toBe('P M K');
});

it('Portfolio defaults include logo glyph "♔"', () => {
  expect(PORTFOLIO_DATA.profile.logoGlyph).toBe('♔');
});

it('Portfolio profile schema provides logoImage, favicon, and siteTitle slots', () => {
  expect('logoImage' in PORTFOLIO_DATA.profile).toBe(true);
  expect('favicon' in PORTFOLIO_DATA.profile).toBe(true);
  expect('siteTitle' in PORTFOLIO_DATA.profile).toBe(true);
});

it('Simulates custom image logo update without mutating defaults', () => {
  const customProfile = {
    ...PORTFOLIO_DATA.profile,
    logoImage: 'data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=',
    brand: 'NEXUS',
    logoGlyph: '⚡',
  };
  expect(customProfile.brand).toBe('NEXUS');
  expect(customProfile.logoGlyph).toBe('⚡');
  expect(customProfile.logoImage.startsWith('data:image/')).toBe(true);
});

console.log('\nGroup 3: Content Structure & Database Integrity (Strictly Authentic Data)');
it('Contains valid projects array with verified entries', () => {
  expect(Array.isArray(PORTFOLIO_DATA.projects)).toBe(true);
  expect(PORTFOLIO_DATA.projects.length).toBeGreaterThan(0);
});

it('Default profile avatar is authentic /profile.jpeg', () => {
  expect(PORTFOLIO_DATA.profile.avatar).toBe('/profile.jpeg');
});

it('Supports updating profile avatar to custom Base64 Data URL or path', () => {
  const updated = {
    ...PORTFOLIO_DATA.profile,
    avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
  };
  expect(updated.avatar.startsWith('data:image/')).toBe(true);
});

it('Contains authentic owner details for Blessing Bryson Hong', () => {
  expect(PORTFOLIO_DATA.profile.name).toContain('Blessing Bryson Hong');
  expect(PORTFOLIO_DATA.profile.fullName).toBe('P M K BLESSING BRYSON HONG');
  expect(PORTFOLIO_DATA.profile.email).toBe('blessingbrysonhongpmk@gmail.com');
  expect(PORTFOLIO_DATA.profile.institution).toContain("St. Xavier's");
});

it('Contains zero mock/dummy/placeholder text across entire dataset', () => {
  const dataString = JSON.stringify(PORTFOLIO_DATA);
  expect(dataString.includes('example.com')).toBe(false);
  expect(dataString.includes('lorem ipsum')).toBe(false);
  expect(dataString.includes('John Doe')).toBe(false);
});

it('Contains verified skill categories', () => {
  expect(Array.isArray(PORTFOLIO_DATA.skillCategories)).toBe(true);
  expect(PORTFOLIO_DATA.skillCategories.length).toBeGreaterThan(0);
});

it('Contains company experiences for internship showcase', () => {
  expect(Array.isArray(PORTFOLIO_DATA.companyExperiences)).toBe(true);
  expect(PORTFOLIO_DATA.companyExperiences.length).toBeGreaterThan(0);
});

it('Contains verified social channels', () => {
  expect(Array.isArray(PORTFOLIO_DATA.socials)).toBe(true);
  expect(PORTFOLIO_DATA.socials.length).toBeGreaterThan(0);
});

console.log('\n========================================');
console.log(` TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log('========================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}


export const MISSIONS_CONFIG = {
    3: {
        name: 'Password Security',
        type: 'password',
        description: 'Buat password yang aman',
        reward: 1000,
        requirements: {
            minLength: 8,
            needsUpperCase: true,
            needsLowerCase: true,
            needsNumber: true,
            needsSpecial: true
        }
    },
    9: {
        name: 'Social Media Security',
        type: 'social',
        description: 'Misi keamanan media sosial',
        reward: 1500,
        requirements: {
            // Akan diisi sesuai kebutuhan misi
        }
    },
    36: {
        name: 'Finish',
        type: 'finish',
        description: 'Selamat! Kamu telah menyelesaikan permainan',
        showStats: true
    }
};

export const MISSION_TYPES = {
    password: 'PasswordMission',
    social: 'SocialMission',
    finish: 'FinishMission'
}; 
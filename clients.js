
export const clients = [
    // user #1 (jenny)
    {
      userName: 'jenny',
      cardNumber: '002-5678-901',
      pin: '0091',
      accounts: [
        { type: 'checking', balance: 2500.75, accountNumber: 'CHQ-000' },
        { type: 'savings', balance: 10500.0, accountNumber: 'SVG-001' },
        { type: 'credit', balance: -500.0, accountNumber: 'CRD-002' },
      ],
    },
    // user #2 (mike)
    {
      userName: 'mike',
      cardNumber: '003-6789-012',
      pin: '1234',
      accounts: [
        { type: 'checking', balance: 1500.0, accountNumber: 'CHQ-003' },
        { type: 'savings', balance: 250.5, accountNumber: 'SVG-004' },
        { type: 'credit', balance: -1200.0, accountNumber: 'CRD-005' },
      ],
    },
    // user #3 (sara)
    {
      userName: 'sara',
      cardNumber: '004-7890-123',
      pin: '5678',
      accounts: [
        { type: 'checking', balance: 3200.0, accountNumber: 'CHQ-006' },
        { type: 'savings', balance: 7800.25, accountNumber: 'SVG-007' },
        { type: 'credit', balance: -300.0, accountNumber: 'CRD-008' },
      ],
    },
];
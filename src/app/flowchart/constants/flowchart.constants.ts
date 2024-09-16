export const DEFAULT_DEFINITION_ASL = JSON.stringify({
  StartAt: 'InitialState',
  States: {
    InitialState: {
      Type: 'Pass',
      End: true,
    },
  },
});

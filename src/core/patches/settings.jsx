const { getByDisplayName } = require('@webpack');
const { React } = require('@webpack/common');
const { capitalize } = require('@utilities');
const { after } = require('@patcher');

const { Settings, Manager } = require('@core/components');

const blacklisted = {
   labels: ['Powercord', 'BetterDiscord'],
   sections: ['pc-', 'bdcompat']
};

const SettingsView = getByDisplayName('SettingsView');
after('unbound-settings', SettingsView.prototype, 'getPredicateSections', (_, args, sections) => {
   // Remove integrated settings views
   sections = sections.filter(s => {
      const index = sections.indexOf(s);
      if (s.section == 'DIVIDER' && sections[index + 1]?.label == 'BetterDiscord') {
         return false;
      }

      if (blacklisted.labels.includes(s.label)) {
         return false;
      }

      if (blacklisted.sections.some(e => s.section?.includes(e) || s.id?.includes(e))) {
         return false;
      }

      return true;
   });

   const changelog = sections.find(c => c.section === 'changelog');
   if (changelog) {
      sections.splice(
         sections.indexOf(changelog), 0,
         {
            section: 'HEADER',
            label: 'Unbound'
         },
         {
            section: 'unbound',
            label: 'Settings',
            element: Settings
         },
         ...Object.keys(unbound.managers).map(m => ({
            section: capitalize(m),
            label: capitalize(m),
            element: m.panel
         })),
         { section: 'DIVIDER' }
      );

      sections._splice = sections.splice;
      sections.splice = function (...args) {
         const items = args.slice(2);

         if (
            items?.length &&
            items.some(i => blacklisted.labels.some(l => i.label?.includes(l)))
         ) return sections;

         return sections._splice(...args);
      };

      return sections;
   }
});
'use babel';

import MyPackage from '../lib/netbeans-HotKeys-4-ATOM-NG';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('MyPackage', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('netbeans-HotKeys-4-ATOM-NG');
  });

  describe('when the netbeans-HotKeys-4-ATOM-NG:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.netbeans-HotKeys-4-ATOM-NG')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'netbeans-HotKeys-4-ATOM-NG:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.netbeans-HotKeys-4-ATOM-NG')).toExist();

        let myPackageElement = workspaceElement.querySelector('.netbeans-HotKeys-4-ATOM-NG');
        expect(myPackageElement).toExist();

        let myPackagePanel = atom.workspace.panelForItem(myPackageElement);
        expect(myPackagePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'netbeans-HotKeys-4-ATOM-NG:toggle');
        expect(myPackagePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.netbeans-HotKeys-4-ATOM-NG')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'netbeans-HotKeys-4-ATOM-NG:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let myPackageElement = workspaceElement.querySelector('.netbeans-HotKeys-4-ATOM-NG');
        expect(myPackageElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'netbeans-HotKeys-4-ATOM-NG:toggle');
        expect(myPackageElement).not.toBeVisible();
      });
    });
  });
});

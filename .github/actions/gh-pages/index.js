const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');

/* TODO
[ ] use the version tag in the commit message
[ ] unit tests
[ ] setup github pages? via ocktokit?
[ ] node v14?
*/

async function run () {
  try {
    if (core.isDebug()) {
      core.startGroup('Debug: context');
      core.debug(core.context);
      core.endGroup();
    }

    const buildPath = 'storybook-static';
    const { payload } = github.context;
    const owner = payload.repository.owner.name;
    const repo = payload.repository.name;

    core.info('TOPLKEN');
    core.info(core.getInput('github_token'))

    const octokit = github.getOctokit(core.getInput('github_token'))

    core.info('[INFO]: commencing gh-pages deploy')

    core.info('[INFO]: running storybook build')
    await exec.exec('npm', ['run', 'build-storybook']);

    core.info('[INFO]: configuring git')
    await exec.exec('git', ['config', '--global', 'user.email', 'github-actions[bot]@users.noreply.github.com']);
    await exec.exec('git', ['config', '--global', 'user.name', 'github-actions[bot]']);

    core.info('[INFO]: checking out gh-pages branch')
    // -B: don't error if the branch already exists
    await exec.exec('git', ['checkout', '-B', 'gh-pages']);

    core.info('[INFO]: adding storybook static files')
    // --force: override .gitignore
    await exec.exec('git', ['add', '--force', buildPath]);

    core.info(`[INFO]: get latest release, owner:${owner} repo:${repo}`);
    const tag = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: 29,
      mediaType: {
        format: 'diff'
      }
  });
    // const tag = await octokit.rest.repos.getLatestRelease({
    //   owner,
    //   repo,
    // });

    core.debug(tag)

    console.log(tag)

    core.info('[INFO]: committing changes');
    await exec.exec('git', ['commit', '-m', `docs(gh-pages): ${tag.name}`]);

    core.info('[INFO]: pushing to gh-pages');
    await exec.exec('git', ['push', '-f', '--set-upstream', 'origin', 'gh-pages']);

    core.info(`[INFO]: create pages site, owner:${owner} repo:${repo}`);
    await octokit.rest.repos.createPagesSite({
        owner,
        repo,
        source: {
          branch: 'gh-pages',
          path: buildPath,
        },
      })

  } catch (error) {
    core.debug(error);
    core.setFailed(error.message);
  }
}

(async () => { await run() })();

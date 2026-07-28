import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { CatmarkMark } from '../components/CatmarkMark';

const ICON_BACK = (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
  </svg>
);

const ICON_EXTERNAL = (
  <svg viewBox="0 0 16 16" aria-hidden="true">
    <path d="M9.5 2.5h4v4M13.2 2.8 7.4 8.6M12.5 8.5v3.2a1.8 1.8 0 0 1-1.8 1.8H4.3a1.8 1.8 0 0 1-1.8-1.8V5.3a1.8 1.8 0 0 1 1.8-1.8h3.2" />
  </svg>
);

const FEATURES = [
  {
    number: '01',
    enTitle: 'Canvas-based organization',
    zhTitle: '画布式整理',
    enDescription: 'Keep bookmarks in a visual canvas instead of a long, rigid browser list.',
    zhDescription: '把书签放进可视化画布中整理，不再局限于浏览器里的长列表。',
  },
  {
    number: '02',
    enTitle: 'Useful bookmark details',
    zhTitle: '完整的书签信息',
    enDescription: 'Edit the link, title, tag, note, and cover image from one focused panel.',
    zhDescription: '在同一个编辑面板中管理链接、标题、标签、备注和封面图。',
  },
  {
    number: '03',
    enTitle: 'Five card formats',
    zhTitle: '五种卡片形态',
    enDescription: 'Choose large, compact, image, text, or favicon-only cards for different content.',
    zhDescription: '可选择大卡片、小卡片、图片卡片、文字卡片或仅图标卡片。',
  },
  {
    number: '04',
    enTitle: 'Direct actions',
    zhTitle: '快捷操作',
    enDescription: 'Refresh bookmark information, open the original link, and apply edits in place.',
    zhDescription: '可以刷新书签信息、打开原始链接，并直接应用编辑结果。',
  },
];

const STEPS = [
  {
    number: '1',
    enTitle: 'Sign in',
    zhTitle: '登录',
    enDescription: 'Use Google sign-in to open your bookmark canvas.',
    zhDescription: '使用 Google 登录，进入你的书签画布。',
  },
  {
    number: '2',
    enTitle: 'Add or edit',
    zhTitle: '添加或编辑',
    enDescription: 'Complete the bookmark details and select a card format.',
    zhDescription: '补充书签信息，并选择合适的卡片形态。',
  },
  {
    number: '3',
    enTitle: 'Arrange and revisit',
    zhTitle: '整理与回访',
    enDescription: 'Arrange the canvas, then reopen saved links whenever you need them.',
    zhDescription: '在画布中完成整理，需要时随时重新打开已保存的链接。',
  },
];

export function Catmark() {
  const { t, language } = useAppContext();

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = descriptionMeta?.content;
    const descriptionElement = descriptionMeta ?? document.createElement('meta');

    document.title = language === 'en'
      ? 'Catmark — Visual Bookmark Canvas'
      : 'Catmark — 可视化书签画布';
    descriptionElement.name = 'description';
    descriptionElement.content = language === 'en'
      ? 'Catmark is a visual bookmark canvas with editable details and five flexible card formats.'
      : 'Catmark 是一个可视化书签画布，支持编辑书签信息和五种灵活的卡片形态。';

    if (!descriptionMeta) {
      document.head.appendChild(descriptionElement);
    }

    return () => {
      document.title = previousTitle;
      if (descriptionMeta && previousDescription !== undefined) {
        descriptionMeta.content = previousDescription;
      } else {
        descriptionElement.remove();
      }
    };
  }, [language]);

  return (
    <>
      <nav className="top-nav">
        <div className="catmark-nav-inner">
          <Link className="catmark-back" to="/">
            {ICON_BACK}
            <span>no bluue</span>
          </Link>
          <span className="catmark-breadcrumb">
            <span>/</span>
            <span>AI Life</span>
            <span>/</span>
            <strong>Catmark</strong>
          </span>
        </div>
      </nav>

      <main className="detail-page catmark-page">
        <section className="d-hero catmark-hero" aria-labelledby="catmark-title">
          <div className="d-hero-icon catmark-hero-icon">
            <CatmarkMark className="catmark-hero-mark" />
          </div>
          <div className="catmark-hero-copy">
            <div className="catmark-kicker">Bookmark Canvas</div>
            <h1 id="catmark-title">Catmark</h1>
            <p>
              {t(
                'A calmer, more visual place for the links you want to keep.',
                '给值得保留的链接一个更安静、更直观的位置。',
              )}
            </p>
          </div>
        </section>

        <section className="d-card catmark-about" aria-labelledby="catmark-about-title">
          <div className="label">{t('About Catmark', '关于 Catmark')}</div>
          <h2 id="catmark-about-title">
            {t('Turn a bookmark list into a personal canvas', '把书签列表变成个人画布')}
          </h2>
          <p>
            {t(
              'Catmark helps you collect and revisit web links through a visual bookmark canvas. After signing in with Google, you can edit the information attached to each bookmark, choose how every item appears, and keep the collection easier to scan.',
              'Catmark 用可视化书签画布帮助你收藏和重新发现网页链接。使用 Google 登录后，你可以编辑每个书签的信息、选择不同的呈现方式，让收藏内容更容易浏览。',
            )}
          </p>
          <div className="catmark-actions">
            <a
              className="catmark-primary-action"
              href="https://bookmark.nobluue.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t('Open Catmark', '打开 Catmark')}</span>
              {ICON_EXTERNAL}
            </a>
            <Link className="catmark-secondary-action" to="/">
              {t('Back to AI Life', '返回 AI Life')}
            </Link>
          </div>
        </section>

        <section className="d-card" aria-labelledby="catmark-features-title">
          <div className="label" id="catmark-features-title">{t('What you can do', '你可以做什么')}</div>
          <div className="catmark-feature-list">
            {FEATURES.map((feature) => (
              <article className="feat-item catmark-feature" key={feature.number}>
                <span className="catmark-feature-number">{feature.number}</span>
                <div>
                  <h3>{t(feature.enTitle, feature.zhTitle)}</h3>
                  <p>{t(feature.enDescription, feature.zhDescription)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="d-card" aria-labelledby="catmark-steps-title">
          <div className="label" id="catmark-steps-title">{t('A simple flow', '简单的使用流程')}</div>
          <ol className="catmark-steps">
            {STEPS.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{t(step.enTitle, step.zhTitle)}</h3>
                  <p>{t(step.enDescription, step.zhDescription)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <footer className="footer catmark-footer">
          <p>
            Catmark by no bluue &nbsp;·&nbsp;{' '}
            <a href="https://bookmark.nobluue.com/" target="_blank" rel="noopener noreferrer">
              bookmark.nobluue.com
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}

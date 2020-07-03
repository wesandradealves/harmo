import Vue from 'vue'
import Router from 'vue-router'

const home = resolve => require(["@/views/home/home.vue"], resolve);
const reviews = resolve => require(["@/views/reviews/reviews.vue"], resolve);
const PageNotFound = resolve =>
  require(["@/views/PageNotFound/PageNotFound.vue"], resolve);

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "current",
  routes: [
    {
      path: "*",
      name: "404",
      component: PageNotFound,
      meta: {
        title: "Harmo | 404"
      }
    },
    {
      path: "/",
      name: "Home",
      component: home,
      meta: {
        ico: "ti-home",
        title: "Harmo"
      },
      props: true
    },
    {
      path: "/reviews",
      name: "Reviews",
      component: reviews,
      meta: {
        ico: "ti-view-list-alt",
        title: "Harmo | Relatórios"
      },
      props: true,
      children: [
       {
          path: "/reviews/total",
          name: "Totais",
          component: reviews,
          meta: {
            title: 'Harmo - Relatórios | Totais',
          }
        },{
          path: "/reviews/gender",
          name: "Gênero",
          component: reviews,
          meta: {
            title: 'Harmo - Relatórios | Gênero',
          },
          children: [
            {
              path: "/reviews/gender/male",
              name: "Male",
              component: reviews,
              meta: {
                title: 'Harmo - Relatórios | Gênero - Masculino',
              }
            },{
              path: "/reviews/gender/female",
              name: "Female",
              component: reviews,
              meta: {
                title: 'Harmo - Relatórios | Gênero - Feminino',
              }
            }  
          ],
        }   
      ],
    }
  ]
});

router.beforeResolve((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags);

  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    el => el.parentNode.removeChild(el)
  );

  if (!nearestWithMeta) return next();
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute("data-vue-router-controlled", "");
      return tag;
    })
    .forEach(tag => document.head.appendChild(tag));

    next();
});

router.afterEach((to, from) => {
  window.scrollTo( 0, 0 )
})

export default router;
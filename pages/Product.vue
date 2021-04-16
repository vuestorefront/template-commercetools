<template>
  <div id="product">
    <code>
      {{ product }}
    </code>
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery
          :images="productGallery"
          class="product__gallery"
          enable-zoom
        />
      </LazyHydrate>
      <div>
        <SfAddToCart
          data-cy="product-cart_add"
          v-model="qty"
          :disabled="loading"
          class="product__add-to-cart"
          @click="addItem({ product, quantity: parseInt(qty) })"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { SfAddToCart, SfGallery } from '@storefront-ui/vue';
import { ref, computed } from '@vue/composition-api';
import {
  useProduct,
  useCart,
  productGetters
} from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Product',
  transition: 'fade',
  setup(props, context) {
    const qty = ref(1);
    const { id } = context.root.$route.params;
    const { products, search } = useProduct('products');
    const { addItem, loading } = useCart();
    const product = computed(
      () =>
        productGetters.getFiltered(products.value, {
          master: true
        })[0]
    );

    const productGallery = computed(() =>
      productGetters.getGallery(product.value).map((img) => ({
        mobile: { url: img.small },
        desktop: { url: img.normal },
        big: { url: img.big },
        alt: product.value._name || product.value.name
      }))
    );

    onSSR(async () => {
      await search({ id });
    });

    return {
      product,
      qty,
      addItem,
      loading,
      productGetters,
      productGallery
    };
  },
  components: {
    SfAddToCart,
    SfGallery,
    LazyHydrate
  },
  data() {
    return {
      stock: 5,
      properties: [
        {
          name: 'Product Code',
          value: '578902-00'
        },
        {
          name: 'Category',
          value: 'Pants'
        },
        {
          name: 'Material',
          value: 'Cotton'
        },
        {
          name: 'Country',
          value: 'Germany'
        }
      ],
      description:
        'Find stunning women cocktail and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.',
      detailsIsActive: false,
      brand:
        'Brand name is the perfect pairing of quality and design. This label creates major everyday vibes with its collection of modern brooches, silver and gold jewellery, or clips it back with hair accessories in geo styles.',
      careInstructions: 'Do not wash!',
      breadcrumbs: [
        {
          text: 'Home',
          route: {
            link: '#'
          }
        },
        {
          text: 'Category',
          route: {
            link: '#'
          }
        },
        {
          text: 'Pants',
          route: {
            link: '#'
          }
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__gallery {
    flex: 1;
  }
}
</style>

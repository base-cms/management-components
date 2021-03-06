<template>
  <div class="bmc-primary-category-component">
    <loading-spinner v-if="isLoading" color="primary" size="small" />
    <taxonomy-field
      v-else-if="!error"
      type="Category"
      :taxonomy="taxonomy"
      :disabled="isLoading"
      @change="setTaxonomy"
    />
    <operation-error
      :error="error"
      :can-cancel="false"
      @retry="load"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag';
import taxonomyFragment from '../../graphql/common/fragments/taxonomy';
import TaxonomyField from '../common/fields/taxonony.vue';
import LoadingSpinner from '../loading-spinner.vue';
import OperationError from '../operation-error.vue';

const query = gql`
  query LoadPrimaryCategory($input: TaxonomyQueryInput!) {
    taxonomy(input: $input) {
      ...CommonTaxonomy
      hierarchy {
        id
      }
    }
  }
  ${taxonomyFragment}
`;

export default {
  props: {
    categoryId: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    taxonomy: null,
    isLoading: false,
    error: null,
  }),

  components: { TaxonomyField, OperationError, LoadingSpinner },

  mounted() {
    this.load();
  },

  methods: {
    setTaxonomy(taxonomy) {
      this.taxonomy = taxonomy;
      this.$emit('change', taxonomy);
    },

    async load() {
      const { categoryId } = this;
      if (categoryId && !this.isLoading) {
        this.isLoading = true;
        this.error = null;
        const input = { id: categoryId };
        try {
          const { data } = await this.$apollo.query({ query, variables: { input } });
          this.taxonomy = data.taxonomy;
        } catch (e) {
          this.error = e;
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";
@import "../../scss/mixins";

.bmc-primary-category-component {
  @include bmc-base();
}
</style>

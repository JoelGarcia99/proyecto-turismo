import es_translations from './es';

/**
 * Contains some general methods to translate
 **/
export default class AppTranslator {

  getText(key, language="es") {
    switch(language) {
      case "es":
      default:
	return es_translations[key];
    }
  }
}
